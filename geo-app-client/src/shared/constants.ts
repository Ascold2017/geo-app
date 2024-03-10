
export const AUTH_PATH = '/auth';
export const PRACTICE_PATH = '/practice'
export const PROGRESS_PATH = '/progress'
export const TOPICS_PATH = '/topics';
export const TOPIC_PATH = '/topics/:id';
export const TOPIC_VIDEO_PATH = '/topics/:id/video';
export const TOPIC_LECTURE_PATH = '/topics/:id/lecture';
export const TOPIC_WORDS_PATH = '/topics/:id/words';
export const TOPIC_LETTERS_PATH = '/topics/:id/letters';
export const TOPIC_PRACTICE_PATH = '/topics/:id/practice';

export const TOPIC_PATH_GEN = (id: number) => `${TOPICS_PATH}/${id}`;
export const TOPIC_VIDEO_PATH_GEN = (id: number) => `${TOPICS_PATH}/${id}/video`;
export const TOPIC_LECTURE_PATH_GEN = (id: number) => `${TOPICS_PATH}/${id}/lecture`;
export const TOPIC_LETTERS_PATH_GEN = (id: number) => `${TOPICS_PATH}/${id}/letters`;
export const TOPIC_WORDS_PATH_GEN = (id: number) => `${TOPICS_PATH}/${id}/words`;
export const TOPIC_PRACTICE_PATH_GEN = (id: number) => `${TOPICS_PATH}/${id}/practice`;