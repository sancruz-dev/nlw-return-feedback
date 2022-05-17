import { useState } from "react"

import bugImageUrl from '../../assets/img/bug.svg'
import ideaImageUrl from '../../assets/img/idea.svg'
import thoughtImageUrl from '../../assets/img/thought.svg'
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep"
import { FeedbackContentStep } from "./Steps/FeedbackContentStep"
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep"

export const feedbackTypes = {
   BUG: {
      title: 'Problema',
      image: {
         source: bugImageUrl,
         alt: 'Imagem de um inseto',
      }
   },
   IDEA: {
      title: 'Ideia',
      image: {
         source: ideaImageUrl,
         alt: 'Imagem de uma lâmpada',
      }
   },
   OTHER: {
      title: 'Outro',
      image: {
         source: thoughtImageUrl,
         alt: 'Imagem de um Blão de pensamento',
      }
   },
}

export type FeedbackType = keyof typeof feedbackTypes
// [B] Convertendo tipagem para chave


export function WidgetForm() {
   const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
   const [feedbackSent, setFeedbackSent] = useState(false)

   function handleRestartFeedback() {
      setFeedbackSent(false)
      setFeedbackType(null)
   }

   return (
      <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
         {feedbackSent ? (
            <FeedbackSuccessStep onfeedbackRestartedRequested={handleRestartFeedback} />
         ) : (
            <>
               {!feedbackType ? (
                  <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
               ) : (
                  <FeedbackContentStep
                     feedbackType={feedbackType}
                     onFeedbackRestartedRequested={handleRestartFeedback}
                     onFeedbackSent={() => setFeedbackSent(true)}
                  />

               )}
               {/* [B] Condição feedbackTypes */}
            </>
         )}

         <footer className="text-sm text-gray-400 font-semibold">
            Feito com ♥ por <a className="underline underline-offset-2" href="https://www.sancruz.netlify.app">Sancruz</a>
         </footer>
      </div>

   )
}

/* ANOTAÇÕES 

• [A] Convertendo tipagem para chave
   - Estrutura: export type FeedbackType = keyof typeof feedbackTypes
   - Descrição: devido o typescript não conseguir identificar cada objeto dentro de um array de objetos separadamente, então foi preciso converter a estrutura de objetos para tipos de CHAVES existentes.
................................

• [B] Condição feedbackTypes
   - Estrutura/esboço da condição: {!feedbackTypes ? (...) : (...)}
   - Descrição: {Se nenhuma chave de feedbackTypes foi definida/escolhida, então exiba os tipos de opções (BUG|IDEA|OTHER), senão, exiba Hello World (ou qualquer outra coisa)}


*/