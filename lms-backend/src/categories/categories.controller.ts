import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateCategoryDto } from './dto/CreateCategoryDto';
import { UpdateCategoryDto } from './dto/UpdateCategoryDto';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService : CategoriesService ){}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
        create(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.create(dto); // sirf dto
    }
    @Get()
      findAll() {
        return this.categoriesService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Patch(':id')
        update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) {
            return this.categoriesService.update(id, dto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
        remove(@Param('id', ParseIntPipe) id: number) {
            return this.categoriesService.remove(id);
        }
    }
