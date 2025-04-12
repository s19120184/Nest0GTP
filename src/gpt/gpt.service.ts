import { Injectable } from '@nestjs/common';
import { orthographyChechUseCase } from './use-cases/orthography.use-case';
import { OrthographyDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
    //el service solo va llamar los casos de uso


    //creamos la instancia de OpenAI
    private openai = new OpenAI({
        baseURL:"https://api.deepseek.com/v1",
        apiKey:process.env.DEEPSEEK_API_KEY
    })


   async orthographyChech(orthographyDto:OrthographyDto){
    
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return  await orthographyChechUseCase(this.openai,{
           prompt : orthographyDto.prompt
        })


    }
}
