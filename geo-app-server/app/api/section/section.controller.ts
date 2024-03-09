import { Context } from "koa";
import { DI } from "../../main";
import { AdmSectionDTO, BaseSectionDTO } from "./section.dto";

export const getSectionList = async (context: Context) => {
  const sections = await DI.section.find({});
  context.response.body = sections.map(
    (section) => new BaseSectionDTO(section),
  );
};

export const getAdmSectionList = async (context: Context) => {
  
  const sections = await DI.section.find({ select: { topics: { id: true }}, relations: { topics: true }});
  context.response.body = sections.map(
    (section) => new AdmSectionDTO(section),
  );
  
};

export const getAdmSection = async (context: Context) => {
  const section = await DI.section.findOne({ where: { id: context.params.id } });

  if (!section) {
    context.response.status = 404;
    context.response.body = { error: "Не найден" };
    return;
  }

  context.response.body = new BaseSectionDTO(section);
};

export const postAdmSection = async (context: Context) => {
  const payload = {
    title: context.request.body.title,
    imageUrl: context.request.body.imageUrl
  }
  const section = DI.section.create(payload);
  await DI.section.save(section);
  context.response.body = new BaseSectionDTO(section);

};

export const patchAdmSection = async (context: Context) => {
  
  const section = await DI.section.findOneBy({ id: context.params.id });
  if (!section) {
    context.response.status = 404;
    context.response.body = { error: "Не найден" };
    return;
  }
  DI.section.merge(section, context.request.body)
  await DI.section.save(section);
  context.response.body = new BaseSectionDTO(section);
  
};

export const deleteAdmSection = async (context: Context) => {
  
  const section = await DI.section.findOne({ where: { id: context.params.id } });
  if (!section) {
    context.response.status = 404;
    context.response.body = { error: "Не найден" };
    return;
  }
  await DI.section.remove(section)
  context.response.body = { ok: true };

};
