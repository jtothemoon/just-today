// src/utils/date.ts
export const checkNewDay = (lastDate: Date): boolean => {
  const currentDate = new Date();
  return (
    currentDate.getDate() !== lastDate.getDate() ||
    currentDate.getMonth() !== lastDate.getMonth() ||
    currentDate.getFullYear() !== lastDate.getFullYear()
  );
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

export const checkShouldReset = (lastDate: Date, resetTime: string): boolean => {
  const currentDate = new Date();
  const [hours, minutes] = resetTime.split(':').map(Number);
  
  // 오늘의 리셋 시간 생성
  const todayResetTime = new Date();
  todayResetTime.setHours(hours, minutes, 0, 0);
  
  // 마지막 할일의 리셋 시간 생성
  const lastResetTime = new Date(lastDate);
  lastResetTime.setHours(hours, minutes, 0, 0);
  
  // 현재 시간이 오늘의 리셋 시간을 지났는지 확인
  const hasPassedResetTime = currentDate >= todayResetTime;
  
  // 마지막 할일이 이전 리셋 시간보다 이전인지 확인
  const isFromPreviousPeriod = lastDate < lastResetTime;
  
  return hasPassedResetTime && isFromPreviousPeriod;
};

export const getTimeUntilReset = (resetTime: string): string => {
  const now = new Date();
  const [hours, minutes] = resetTime.split(':').map(Number);
  
  // 다음 리셋 시간 계산
  const nextReset = new Date();
  nextReset.setHours(hours, minutes, 0, 0);
  
  // 현재 시간이 리셋 시간을 지났다면, 다음 날의 리셋 시간으로 설정
  if (now > nextReset) {
    nextReset.setDate(nextReset.getDate() + 1);
  }
  
  // 남은 시간 계산 (밀리초)
  const timeLeft = nextReset.getTime() - now.getTime();
  
  // 시간과 분으로 변환
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hoursLeft}시간 ${minutesLeft}분`;
};