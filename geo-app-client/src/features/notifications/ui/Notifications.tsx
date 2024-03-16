import { useNotificationModel } from "../model/index";

export const Notifications = () => {
    const { notification } = useNotificationModel();

    return (
        <div className="fixed bottom-0 right-0 p-4">
            {notification && (
                <div className="bg-gray-200 text-gray-800 rounded-md p-4 shadow-md">
                    {notification.message}
                </div>
            )}
        </div>
    );
};