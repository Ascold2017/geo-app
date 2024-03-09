import { useNavigate } from "react-router-dom";
import { useRequest } from "ahooks";
import clx from 'classnames';
import { useGetUserTopics } from "@api/sections";
import { useEffect } from "react";
import AppSpin from "@common/components/ui/AppSpin";
import AppBadge from "@common/components/ui/AppBadge";
import useAuth from "@app/auth/stores/auth";
import { UserTopic } from "@app/common/constants/types";
import { TOPIC_PATH_GEN } from "@app/topic/constants";

export default function TopicsPage() {
  const navigate = useNavigate();
  const user = useAuth(s => s.user);

  const { loading, data: topics, error, runAsync } = useRequest(useGetUserTopics(), { manual: true })

  useEffect(() => {
    if (user.currentSectionId) {
      runAsync();
    }
  }, [runAsync, user.currentSectionId])

  const renderTopicCard = (topic: UserTopic) => (

    <article key={topic.id} className={clx({ "card h-full flex-none bg-base-100 shadow-xl mr-3": true, 'hoverable': topic.isPremium ? user.isPremium : true })}
      onClick={() => {
        if (topic.isPremium ? user.isPremium : true) {
          navigate(TOPIC_PATH_GEN(topic.id))
        }
      }}
    >
      <figure>
        <img alt="example" src={`https://img.youtube.com/vi/${topic.videoId}/hqdefault.jpg`} />
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-between mt-auto">
          <h3 className="app-title-3 mt-auto">{topic.title}</h3>
          <span className="app-text-2">{topic.progress} %</span>
        </div>
        <AppBadge text="Premium" color="primary" className={clx({ 'absolute right-3 top-3': true, 'hidden': !topic.isPremium })} />
      </div>

    </article>
  );

  if (loading && !topics) return <AppSpin spinning />
  if (error) return <p className="app-text-1">Произошла ошибка: {error?.message}</p>
  return <>
    <AppSpin spinning={loading} />
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {topics?.map(topic => renderTopicCard(topic))}
    </section>
  </>;
}