import { useEffect } from "react";
import { ProfileFeed } from "../../Components/FeedItem.js/NewsFeed";
import { Loader } from "../../Components/Loader";
import { MainLayout } from "../../Components/MainLayout";
import { API_STATUS } from "../../services/constants";
import { useGetNewsData } from "../../services/getFeedData";
import { NewPost } from "./NewPost";

export const Profile = () => {
  const { fetch, res, status } = useGetNewsData();

  useEffect(() => {
    fetch();
  }, []);

  if (status !== API_STATUS.SUCCESS) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <NewPost />
      <ProfileFeed data={res} />
    </MainLayout>
  );
};
