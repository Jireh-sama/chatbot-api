const logfn = (status, time) => console.log(status, time);

const nlpManagerConfig = {
  languages: ["en"],
  nlu: { log: false, useNoneFeature: true },
  forceNER: true,
  autoSave: false
};

module.exports = nlpManagerConfig