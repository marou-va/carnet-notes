import {
    Controller,
    Post,
    Get,
    Patch,
    Put,
    Delete,
    Req,
    Param,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { Request } from 'express';
  import { AuthGuard } from '../auth/auth.guard';
  import { UnauthorizedException } from '@nestjs/common';
  
  @Controller('tasks')
  @UseGuards(AuthGuard)
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    async create(
      @Req() req: Request,
      @Body() body: { title: string; status: string; dueDate: Date },
    ) {
      const userId = req.session.user!.id;
      return this.tasksService.createTask(userId, body);
    }
  
    @Get('')
    async findAll(@Req() req: Request) {
    if (!req.session.user?.id) {
        throw new UnauthorizedException('Authentication required');
    }
    return this.tasksService.readAllTasks(req.session.user.id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Req() req: Request,
      @Body() body: { title?: string; completed?: boolean },
    ) {
      const userId = req.session.user!.id;
      return this.tasksService.updateTask(Number(id), userId, body);
    }
    @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() body: { status: string },
    ) {
    const userId = req.session.user!.id;
    return this.tasksService.updateTaskStatus(
      Number(id),
      userId,
      body.status
    );
  }
  
    @Delete(':id')
    async delete(@Param('id') id: string, @Req() req: Request) {
      const userId = req.session.user!.id;
      return this.tasksService.deleteTask(Number(id), userId);
    }
  }
  