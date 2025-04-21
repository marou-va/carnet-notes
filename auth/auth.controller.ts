import { Controller, Post,Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { Nomuser: string; Prenomuser: string; email: string; password: string }
  ) {
    return this.authService.register(body.Nomuser, body.Prenomuser, body.email, body.password);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authService.validateUser(body.email, body.password);

    if (!result.success) {
      if (result.reason === 'user_not_found') {
        return res.status(404).send({ message: 'Utilisateur non trouvé' });
      } else if (result.reason === 'wrong_password') {
        return res.status(401).send({ message: 'Mot de passe incorrect' });
      }
    }

    req.session.user = {
      id: result.user.id,
      Nomuser: result.user.Nomuser,       
      Prenomuser: result.user.Prenomuser, 
      email: result.user.email
    };
    

    return res.send({ message: 'Connexion réussie' });
  }
  @Get('me')
getProfile(@Req() req: Request, @Res() res: Response) {
  if (!req.session.user) {
    return res.status(401).send({ message: 'Non authentifié' });
  }

  return res.send({ user: req.session.user });
}
@Post('logout')
logout(@Req() req: Request, @Res() res: Response) {
  req.session.destroy(() => {
    // res.clearCookie('connect.sid'); 
    res.send({ message: 'Déconnecté avec succès' });
  });
}

}
