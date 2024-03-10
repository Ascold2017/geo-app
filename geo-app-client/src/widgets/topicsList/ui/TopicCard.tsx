import { useAppModel } from '@app/model';
import { UserTopic } from '@entities/topics'
import { AppBadge, TOPIC_PATH_GEN } from '@shared';
import clx from 'classnames';
import { useNavigate } from 'react-router-dom';

interface TopicCardProps {
    topic: UserTopic;
}
export function TopicCard ({ topic }: TopicCardProps) {
    const navigate = useNavigate();
    const user = useAppModel(s => s.user);
    return (
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
    )
}