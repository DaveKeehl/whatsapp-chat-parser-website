import React, { Suspense } from 'react';
import Linkify from 'react-linkify';

import Attachment from '../Attachment/Attachment';
import * as S from './style';

const intlOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

function Link(decoratedHref, decoratedText, key) {
  return (
    <a key={key} target="_blank" rel="noopener noreferrer" href={decoratedHref}>
      {decoratedText}
    </a>
  );
}

function Message({ message, color, isActiveUser, sameAuthorAsPrevious }) {
  const isSystem = !message.author;
  const dateTime = message.date.toISOString().slice(0, 19).replace('T', ' ');

  return (
    <S.Item
      isSystem={isSystem}
      isActiveUser={isActiveUser}
      sameAuthorAsPrevious={sameAuthorAsPrevious}
    >
      <S.Bubble isSystem={isSystem} isActiveUser={isActiveUser}>
        <S.Index isSystem={isSystem} isActiveUser={isActiveUser}>
          {(message.index + 1).toLocaleString('de-CH')}
        </S.Index>
        <S.Wrapper>
          {!isSystem && !sameAuthorAsPrevious && (
            <S.Author color={color}>{message.author}</S.Author>
          )}
          {message.attachment ? (
            <Suspense fallback={`Loading ${message.attachment.fileName}...`}>
              <Attachment fileName={message.attachment.fileName} />
            </Suspense>
          ) : (
            <Linkify componentDecorator={Link}>
              <S.Message>{message.message}</S.Message>
            </Linkify>
          )}
        </S.Wrapper>
        {!isSystem && (
          <S.Date dateTime={dateTime}>
            {new Intl.DateTimeFormat('default', intlOptions).format(
              message.date,
            )}
          </S.Date>
        )}
      </S.Bubble>
    </S.Item>
  );
}

export default Message;
