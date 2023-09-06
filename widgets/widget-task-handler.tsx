import React from 'react';
import type { WidgetTaskHandlerProps } from 'react-native-android-widget';
import ThumbsUpWidget from '../ThumbsUpWidget';

const nameToWidget = {
  // Hello will be the **name** with which we will reference our widget.
  ThumsUp: ThumbsUpWidget,
};

// eslint-disable-next-line @typescript-eslint/require-await
export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;
  const Widget = nameToWidget[widgetInfo.widgetName as keyof typeof nameToWidget];

  switch (props.widgetAction) {
    case 'WIDGET_ADDED':
      props.renderWidget(<Widget />);
      break;

    case 'WIDGET_UPDATE':
      // Not needed for now
      break;

    case 'WIDGET_RESIZED':
      // Not needed for now
      break;

    case 'WIDGET_DELETED':
      // Not needed for now
      break;

    case 'WIDGET_CLICK':
      // Not needed for now
      break;

    default:
      break;
  }
}
