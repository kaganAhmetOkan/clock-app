export function getClock(secs) {
  const hours = ("0" + Math.floor(secs / 60 / 60)).slice(-2);
  const minutes = ("0" + Math.floor(secs / 60 % 60)).slice(-2);
  const seconds = ("0" + Math.floor(secs % 60)).slice(-2);
  
  return `${hours}:${minutes}:${seconds}`;
};

export function getClock24(mins) {
  const hours = ("0" + Math.floor(mins / 60 % 24)).slice(-2);
  const minutes = ("0" + Math.floor(mins % 60)).slice(-2);

  return { hours, minutes };
}

export function getSensitiveClock(ms) {
  const hours = ("0" + Math.floor(ms / 1000 / 60 / 60)).slice(-2);
  const minutes = ("0" + Math.floor(ms / 1000 / 60 % 60)).slice(-2);
  const seconds = ("0" + Math.floor(ms / 1000 % 60)).slice(-2);
  const milliseconds = ("0" + Math.floor(ms % 100)).slice(-2);

  return { hours, minutes, seconds, milliseconds };
};

export function getEpoch() {
  const epoch = Date.now();
  return {
    epoch,
    seconds: Math.floor(epoch / 1000),
    minutes: Math.floor(epoch / 1000 / 60),
    hours: Math.floor(epoch / 1000 / 60 / 60),
  };
};