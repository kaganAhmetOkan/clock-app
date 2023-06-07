export function getClock(secs) {
  const hours = ("0" + Math.floor(secs / 60 / 60)).slice(-2);
  const minutes = ("0" + Math.floor(secs / 60 % 60)).slice(-2);
  const seconds = ("0" + Math.floor(secs % 60)).slice(-2);
  
  return `${hours}:${minutes}:${seconds}`;
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