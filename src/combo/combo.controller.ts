import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ComboService } from './combo.service';
import { CreateComboDto } from './dto/create-combo.dto';
import { UpdateComboDto } from './dto/update-combo.dto';

@Controller('combo')
export class ComboController {
  constructor(private readonly comboService: ComboService) { }

  @Post()
  create(@Body() createComboDto: CreateComboDto) {
    return this.comboService.create(createComboDto);
  }

  @Get()
  findAll() {
    return this.comboService.findAll();
  }

  @Get('/user')
  checkPrintStatus(@Query('matric') matric: string) {
    return this.comboService.checkPrintStatus(matric);
  }

  @Patch('user/print')
  updatePrintStatus(
    @Body('matric') matric: string,
    @Body('isPrinted') isPrinted: boolean,
  ) {
    return this.comboService.updatePrintStatus(matric, isPrinted);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comboService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComboDto: UpdateComboDto) {
    return this.comboService.update(+id, updateComboDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comboService.remove(+id);
  }
}
