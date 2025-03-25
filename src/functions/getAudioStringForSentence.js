const getAudioStringForSentence = (chapter, object, sentence, part, language) => {
    return `src/chapters/${chapter}/${object}/assets/audio/transcript/${language}/${sentence}${part}.m4a`
}
export default getAudioStringForSentence