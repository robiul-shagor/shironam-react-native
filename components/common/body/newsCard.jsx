import { StyleSheet, Text, View,   } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import UserQuery from '../../../query/userQuery'
import ImageBlurLoading from 'react-native-image-blur-loading';
import { images } from '../../../constants';

const NewsCard = () => {
  const [visiblePostId, setVisiblePostId] = useState(null);
  const [visibleId, setVisibleId] = useState(null);
  const [visibleAdsId, setVisibleAdstId] = useState(null);
  //const [query, setQuery] = useState('')
  //const [type, setType] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [social, setSocial] = useState(false)
  const [routerChanged, setRouterChanged] = useState(false)
  const langMode = 'BN';

  const query = ''; 
  const type = ''; 

  useEffect(() => {
    // if (typeof subCategory !== 'undefined') {
    //     setQuery(subCategory);
    //     setType('subcategory');
    // } else if (typeof category !== 'undefined') {
    //     setQuery(category);
    //     setType('category');
    // } else if (typeof tags !== 'undefined') {
    //     setQuery(tags);
    //     setType('tags');
    // } else if (typeof pathname !== 'undefined' && pathname == "/breaking-news") {
    //     setQuery('breaking-news');
    //     setType('breaking-news');
    // } else if (typeof pathname !== 'undefined' && pathname == "/today-news") {
    //     setQuery('today-news');
    //     setType('today-news');
    // } else {
    // }
    // setQuery('all');
    // setType('all');
  }, [query]); 

  const {
    news
  } = UserQuery(query, pageNumber, type)

  return(
    <View className="space-y-8 lg:space-y-12 col-span-2"> 
        { news && news.map((newsData, index) => (
            <View className="post-item group max-[767px]:p-6 bg-white dark:bg-transparent max-[767px]:dark:bg-[#1E1E1E]" key={index} data-id={newsData.id}>
                <View className={ newsData.ads_image ? 'post-body ads' : 'post-body' }>
                {newsData.ads_image || newsData.thumbnail ? (
                    <ImageBlurLoading
                        thumbnailSource={images.placeholder}
                        source={{ uri: newsData.ads_image || newsData.thumbnail }} // Use ads_image if available, otherwise use thumbnail
                        style={{ width: '100%', height: undefined, aspectRatio: 16 / 9 }}
                    />
                    ) : (
                    <ImageBlurLoading
                        thumbnailSource={images.placeholder}
                        source={images.placeholder} // Provide a default placeholder image source when both ads_image and thumbnail are empty
                        style={{ width: '100%', height: undefined, aspectRatio: 16 / 9 }}
                    />
                    )}

                </View>

                { newsData.ads_image ? (
                    <Text className="post-title font-semibold text-2xl md:text-3xl mt-6 !leading-[1.7em] transition-all hover:text-theme dark:text-white" style={styles.headingBold}>{ langMode == 'BN' ? newsData.title : newsData.title}</Text>
                ) : (
                    <Text className="post-title font-semibold text-2xl md:text-3xl mt-6 !leading-[1.7em] transition-all hover:text-theme dark:text-white" style={styles.headingBold}>{ langMode == 'BN' ? newsData.summary_bn : newsData.summary_en}</Text>
                ) }
            </View>
        )) }
    </View>
  )
}

export default NewsCard

const styles = StyleSheet.create({})