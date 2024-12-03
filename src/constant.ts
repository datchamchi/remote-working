export enum SocketEvent {
  INVITE_OTHER = "invitation",
  ACCPEPT_INVITE = "accept",
  REFUSE_INVITE = "refuse",
  USER_NOT_FOUND = "not_found",
  NOTIFY_USER = "notify",
  NEW_MESSAGE = "new_message",
  NEW_FILE_MESSAGE = "new_file",
  ERROR = "error",
  INVITE_CALL = "invite_call",
  END_CALL = "end_call",
  ACCEPT_CALL = "accept_call",
  REFUSE_CALL = "refuse_call",
}
