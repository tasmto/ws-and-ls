import React from 'react';
import { FlexWidget, ImageWidget, TextWidget } from 'react-native-android-widget';

function ThumbsUpWidget() {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 16,
      }}
    >
      <ImageWidget
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        image={require('./assets/icons/thumbs-up.png')}
        imageWidth={40}
        imageHeight={40}
      />
    </FlexWidget>
  );
}
export default ThumbsUpWidget;
