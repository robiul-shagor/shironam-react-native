import  React from 'react';
import { Text, Image, View } from 'react-native';
import NonUserQuery from '../../../query/nonUserQuery';
import ImageBlurLoading from 'react-native-image-blur-loading';
import { images } from '../../../constants';
import styles from './card.style';

const NewsCardNonUser = () => {
    const query = ''; 
    const { loading, error, news } = NonUserQuery(query)
    const langMode = 'BN';
    //const { langMode } = useContext(UserContext);
    
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

export default NewsCardNonUser;