export default function DateFormat(inputDate: string): string {
    try {
      const date = new Date(inputDate);
      const currentDate = new Date();
  
      const timeDifference = currentDate.getTime() - date.getTime();
      const millisecondsPerSecond = 1000;
      const millisecondsPerMinute = 60 * millisecondsPerSecond;
      const millisecondsPerHour = 60 * millisecondsPerMinute;
      const millisecondsPerDay = 24 * millisecondsPerHour;
      const millisecondsPerWeek = 7 * millisecondsPerDay;
  
      if (timeDifference < millisecondsPerMinute) {
        // Less than a minute
        const seconds = Math.floor(timeDifference / millisecondsPerSecond);
        return `${seconds} seconds`;
      } else if (timeDifference < millisecondsPerHour) {
        // Less than an hour
        return `${Math.floor(timeDifference / millisecondsPerMinute)}m`;
      } else if (timeDifference < millisecondsPerDay) {
        // Less than a day
        return `${Math.floor(timeDifference / millisecondsPerHour)}h`;
      } else if (timeDifference < millisecondsPerWeek) {
        // Less than a week
        return `${Math.floor(timeDifference / millisecondsPerDay)}d`;
      } else {
        // More than or equal to a week
        return `${Math.floor(timeDifference / millisecondsPerWeek)}w`;
      }
    } catch (error) {
      return "";
    }
  }