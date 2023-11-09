export interface ResumeFile {
  file: string;
}

export interface Board {
  title: string;
  resume_files: ResumeFile[];
}

export interface Data {
  boards: Board[];
}

export interface DataBoard {
  data: Data[];
}

export interface Info {
  date: string;
  place?: string;
}

export interface InvitedPerson {
  id: number;
  name: string;
  confirmed_presence: boolean;
  avatar: string;
  username: string;
}

export interface File {
  url: string;
}

export interface EventData {
  id: number;
  title: string;
  type: string;
  description: string;
  info: Info;
  file: File;
  invited_people?: InvitedPerson[];
}

export interface DataEvent {
  data: EventData[];
}