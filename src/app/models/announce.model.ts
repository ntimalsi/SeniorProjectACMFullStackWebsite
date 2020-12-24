export interface Announcement {
    _id : string;
    creatorId : string;
    title : string;
    description : string;
    date : Date;
    files : File[];
  }
  