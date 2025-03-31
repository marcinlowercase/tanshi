// const getAudioStringForSentence = (chapter, object, sentence, part, language) => {
//     return `src/chapters/${chapter}/${object}/assets/audio/transcript/${language}/${sentence}${part}.m4a`
// }
const getAudioStringForSentence = (chapter, object, sentence, language, extension) => {
    return `src/chapters/${chapter}/${object}/assets/audio/transcript/${language}/${sentence}.${extension}`
    // src/chapters/001/beavers/assets/audio/transcript/cree/0.m4a
}
export default getAudioStringForSentence