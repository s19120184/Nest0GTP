import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyChechUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [{ 
        role: 'system', 
        content:  `Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
        Las palabras usadas deben de existir en le diccionario de la real Academia Española,
        Debes de responder en formato JSON, tu tarea es corregirlos y retornar información soluciones,
        también debes de dar un porcentaje de acierto por el usuario,
        
        Si no hay errores, debes de retornar un mensaje de felicitaciones

        Ejemplo de salida 
        {
           userScore:number,
           errores:string[] ,// ['error -> solucion']
           mensaje:string, // Usa emojis y texto para felicitar al usuario
        }
        `
    },
    {
        role:"user",
        content:prompt
    }
],
    model:'deepseek-chat',
    temperature:0.3,  //temperatura de 0 a 2
    max_tokens:150,
    response_format:{
        type:'json_object'
    }
  });

  //console.log(completion);

   
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const jsonResp =  JSON.parse(completion.choices[0].message.content!)

  

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return jsonResp
};

//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
