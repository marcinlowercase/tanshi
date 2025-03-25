// const getAudioStringForSentence = (chapter, object, sentence, part, language) => {
//     return `src/chapters/${chapter}/${object}/assets/audio/transcript/${language}/${sentence}${part}.m4a`
// }
const getAudioStringForSentence = (chapter, object, sentence, language) => {
    return `src/chapters/${chapter}/${object}/assets/audio/transcript/${language}/${sentence}.m4a`
}
export default getAudioStringForSentence