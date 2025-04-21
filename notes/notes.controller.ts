import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async getAllNotes(@Req() req: Request) {
    const userId = req.session.user!.id;
    return this.notesService.readAllNotes(userId);
  }

  @Get(':id')
  async getNote(@Param('id') id: string, @Req() req: Request) {
    const userId = req.session.user!.id;
    return this.notesService.readNote(Number(id), userId);
  }

  @Post()
  async createNote(
    @Req() req: Request,
    @Body() body: { title: string; content: string },
  ) {
    const userId = req.session.user!.id;
    return this.notesService.createNote(userId, body);
  }

  @Put(':id')
async updateNote(
  @Param('id') id: string,
  @Req() req: Request,
  @Body() body: { title?: string; content?: string },
) {
  const userId = req.session.user?.id;
  if (!userId) {
    throw new UnauthorizedException('Utilisateur non connecté');
  }

  const { title, content } = body;

  if (!title || !content) {
    throw new BadRequestException('Les champs title et content sont obligatoires');
  }

  return this.notesService.update(Number(id), userId, { title, content });
}


  @Delete(':id')
  async deleteNote(@Param('id') id: string, @Req() req: Request) {
    const userId = req.session.user!.id;
    return this.notesService.delete(Number(id), userId);
  }
}
