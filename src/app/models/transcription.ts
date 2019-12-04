import {User} from './user';

export class Transcription {
  public id: string;
  public user: User;
  public filePath: string;
  public result: string;
  public fileName: string;
}
