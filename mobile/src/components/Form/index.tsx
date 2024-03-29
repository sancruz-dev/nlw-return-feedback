import React, { useState } from 'react';
import {
   View,
   TextInput,
   Image,
   Text,
   TouchableOpacity
} from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';

import { FeedbackType } from '../Widget';
import { Button } from '../Button';
import { ScreenshotButton } from '../ScreenshotButton';

import { styles } from './styles';
import { theme } from '../../theme';
import { api } from '../../libs/api';
import { feedbackTypes } from '../../utils/feedbackTypes';

interface Props {
   feedbackType: FeedbackType;
   onFeedbackCanceled: () => void;
   onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSent }: Props) {
   const [isSendingFeedback, setIsSendingFeedback] = useState(false);
   const [screenshot, setScreenshot] = useState<string | null>(null);
   const [comment, setComment] = useState('');

   const feedbackTypeInfo = feedbackTypes[feedbackType] // [A]
   
   function handleScreenshot() {
      captureScreen({
         format: 'jpg',
         quality: 0.8
      })
         .then(uri => setScreenshot(uri))
         .catch(error => console.log(error))
   }
   function handleScreenshotRemove() {
      setScreenshot(null)
   }

   async function handleSendFeedback() {
      if (isSendingFeedback) {
         return;
      }
      
      setIsSendingFeedback(true);
      const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

      try {
         await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot: `data:image/png;base64, ${screenshotBase64}`,
         });

         onFeedbackSent();

      } catch (error) {
         console.log(error);
         setIsSendingFeedback(false)
      }
   }

   return (
      <View style={styles.container}>
         <View style={styles.header}>

            <TouchableOpacity onPress={onFeedbackCanceled}>
               <ArrowLeft
                  size={24}
                  weight='bold'
                  color={theme.colors.text_secondary}
               />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
               <Image
                  style={styles.image}
                  source={feedbackTypeInfo.image}
               />
               <Text style={styles.titleText}>
                  {feedbackTypeInfo.title}
               </Text>
            </View>
         </View>

         <TextInput
            multiline
            style={styles.input}
            placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
            placeholderTextColor={theme.colors.text_secondary}
            autoCorrect={false}
            onChangeText={setComment}
         />

         <View style={styles.footer}>
            <ScreenshotButton
               onTakeShot={handleScreenshot}
               onRemoveShot={handleScreenshotRemove}
               screenshot={screenshot}
            />

            <Button
               onPress={handleSendFeedback}
               isLoading={isSendingFeedback}
            />
         </View>
      </View>
   );
}

/** NOTIONS
 * 
 * [A] -> A constante `feedbackTypeInfo` está pegando somente as informações do feedback selecionado. O código seguinte `feedbackTypes[feedbackType]`, em outras palavras, seria: "vá na lista feedbackTypes, e filtre por `[feedbackType]`, ou seja, suas chaves e tipos, para que possam ser usadas suas propriedades."
 *
 * [B] -> uri indica o endereço onde a imagem está armazenada temporariamente.
 * 
 *  */