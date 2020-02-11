import React, { useState } from 'react';

import { get, map } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { NextSeo } from 'next-seo';
import { toastr } from 'react-redux-toastr';

import Button from '../../components/Objects/Button';
import ColourBox from '../../components/Objects/ColourBox';

import { removeColour } from '../../redux/actions/colourActions';
import { colourSelectors } from '../../redux/selectors';

import './shortlist.scss';

const ShortlistPage = props => {
  const { currentUrl } = props;
  const dispatch = useDispatch();

  const savedColours = useSelector(colourSelectors.getSavedColours) || [];

  return (
    <>
      <NextSeo
        title="Colour.it | Your favourite colours"
        description="We can help you find your favourite colours and make a list of them to show your friends!"
        canonical={currentUrl}
        openGraph={{
          title: 'Colour.it | Your favourite colours',
          description:
            'We can help you find your favourite colours and make a list of them to show your friends!',
          type: 'article',
          url: currentUrl
        }}
      />
      <div className="t-shortlist-page">
        <div className="t-shortlist-page__container">
          <h1 className="t-shortlist-page__title">Your saved colours!</h1>
          <div className="t-shortlist-page__colours">
            {map(savedColours, colour => (
              <div key={`colour-${get(colour, 'hexCode')}`} className="t-shortlist-page__colour">
                <ColourBox hexCode={get(colour, 'hexCode')} />
                <span className="t-shortlist-page__colour__text">{get(colour, 'hexCode')}</span>
                <span className="t-shortlist-page__colour__text">
                  R: {get(colour, 'rgb.red')}<br />
                  G: {get(colour, 'rgb.green')}<br />
                  B: {get(colour, 'rgb.blue')}<br />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShortlistPage;
