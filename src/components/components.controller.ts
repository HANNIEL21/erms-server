import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComponentsService } from './components.service';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { AddBlocksDto } from './dto/add-block.dto';

@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) { }

  @Post()
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentsService.create(createComponentDto);
  }

  @Get()
  findAll() {
    return this.componentsService.findAll();
  }

  @Post(':id/blocks')
  addBlocks(
    @Param('id') id: number,
    @Body() dto: AddBlocksDto
  ) {
    return this.componentsService.addBlocks(+id, dto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComponentDto: UpdateComponentDto) {
    return this.componentsService.update(+id, updateComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentsService.remove(+id);
  }
}
