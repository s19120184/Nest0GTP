
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos';
import { ProsConsDiscusserDto } from './dtos/prosConsDicusser.dto';
import { Response } from 'express';

@Controller('gpt')
export class GptController {

  //inyeccion de la dependecia del service
  constructor(private readonly gptService: GptService) {}

  //crear endpoint en el controlador
  @Post('orthography-check')
  orthographyCheck(
      //en el body esperamos un tipo orthographyDto
     @Body()orthographyDto:OrthographyDto
  ){
    return  this.gptService.orthographyChech(orthographyDto)
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(
    @Body()prosConsDicusser:ProsConsDiscusserDto
  ){

    return this.gptService.proConsDicusser(prosConsDicusser)
      
  }

  @Post('pros-cons-discusser-stream')
 async prosConsDicusserStream(
    @Body()prosConsDicusser:ProsConsDiscusserDto,
    @Res() res:Response
  ){

    const strem =await this.gptService.proConsDicusserStream(prosConsDicusser)
    
    res.setHeader('Content-Type', 'application/json')
    res.status(HttpStatus.OK)

    for await(const chunk of strem ){
      
        const piece = chunk.choices[0].delta.content || '';

        
        res.write(piece)
    }

    res.end()


  }


}
