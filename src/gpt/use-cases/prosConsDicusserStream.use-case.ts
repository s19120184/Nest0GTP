import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDicusserStreamUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  return await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
                 Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
                 la respuesta debe de ser en formato markdown,
                 los pros y contras deben de estar en una lista,
            `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    stream:true,
    model: 'deepseek-chat',
    temperature: 0.5,
    max_tokens: 500,
    //    response_format:{
    //     type:'json_object'
    //    }
  });

 
};
