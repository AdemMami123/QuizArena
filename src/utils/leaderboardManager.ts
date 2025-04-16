export interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  time: number;
  date: string;
}

// Save a new score to the leaderboard
export const saveToLeaderboard = (entry: Omit<LeaderboardEntry, 'date'>): void => {
  try {
    // Get existing leaderboard
    const leaderboard = getLeaderboard();
    
    // Add new entry with current date
    const newEntry: LeaderboardEntry = {
      ...entry,
      date: new Date().toISOString()
    };
    
    // Add to leaderboard
    leaderboard.push(newEntry);
    
    // Sort by score (highest first) and then by time (lowest first)
    leaderboard.sort((a, b) => {
      const scorePercA = (a.score / a.total) * 100;
      const scorePercB = (b.score / b.total) * 100;
      
      if (scorePercB !== scorePercA) {
        return scorePercB - scorePercA;
      }
      
      // If scores are equal, sort by time (faster is better)
      return a.time - b.time;
    });
    
    // Keep only top 10 scores
    const topScores = leaderboard.slice(0, 10);
    
    // Save back to localStorage
    localStorage.setItem('quizLeaderboard', JSON.stringify(topScores));
  } catch (error) {
    console.error('Failed to save score to leaderboard', error);
  }
};

// Get the current leaderboard
export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const leaderboardData = localStorage.getItem('quizLeaderboard');
    return leaderboardData ? JSON.parse(leaderboardData) : [];
  } catch (error) {
    console.error('Failed to get leaderboard', error);
    return [];
  }
};

// Clear the leaderboard
export const clearLeaderboard = (): void => {
  try {
    localStorage.removeItem('quizLeaderboard');
  } catch (error) {
    console.error('Failed to clear leaderboard', error);
  }
};