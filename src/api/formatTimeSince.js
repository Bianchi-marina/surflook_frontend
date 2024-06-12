export const formatTimeSince = (timestamp = "") => {
    const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
    const date = new Date(timestampNum * 1000);
    const now = new Date();
  
    const diff = now.getTime() - date.getTime();
    const diffInSeconds = diff / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
  
    if (Math.floor(diffInHours) >= 1) {
      return `${Math.floor(diffInHours)} horas atrás`;
    } else if (Math.floor(diffInMinutes) >= 1) {
      return `${Math.floor(diffInMinutes)} minutos atrás`;
    } else {
      return "Agora mesmo";
    }
  };