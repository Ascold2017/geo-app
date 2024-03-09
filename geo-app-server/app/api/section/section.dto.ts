import { Section } from "./section.entity";

export class BaseSectionDTO {
  public id: number;
  public title: string;
  public imageUrl: string;
  constructor(section: Section) {
    this.id = section.id;
    this.title = section.title;
    this.imageUrl = section.imageUrl;
  }
}

export class AdmSectionDTO extends BaseSectionDTO {
  topicsCount: number;
  constructor(section: Section) {
    super(section);
    this.topicsCount = section.topics.length
  }
}
