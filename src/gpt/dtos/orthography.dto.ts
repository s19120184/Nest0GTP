/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsOptional, IsString } from "class-validator"



export class OrthographyDto{

    //con los decoradores obligamos a que tengan el tipi de dato que queremos

    @IsString()
    readonly prompt:string
    
    @IsInt()
    @IsOptional()
    readonly maxTokens?: number


}