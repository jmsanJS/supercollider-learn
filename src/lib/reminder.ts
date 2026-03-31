const KEY = "sc_volume_warned";

export function hasSeenVolumeReminder(): boolean {
  if (typeof window === "undefined") return false;
  return (
    localStorage.getItem(KEY) === "true" ||
    sessionStorage.getItem(KEY) === "true"
  );
}

export function markVolumeReminderSeen(remindNextSession: boolean): void {
  if (remindNextSession) {
    sessionStorage.setItem(KEY, "true");
  } else {
    localStorage.setItem(KEY, "true");
  }
}
