import React, { useState } from 'react';

import { get, toUpper } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { NextSeo } from 'next-seo';
import { Input } from '@rebass/forms';
import { toastr } from 'react-redux-toastr';
import randomHexColor from 'random-hex-color';
import hexRgb from 'hex-rgb';
import rgbHex from 'rgb-hex';

import Button from '../../components/Objects/Button';
import ColourBox from '../../components/Objects/ColourBox';

import { saveColour } from '../../redux/actions/colourActions';

import './home.scss';

const HomePage = props => {
  const { currentUrl } = props;
  const dispatch = useDispatch();

  const isValidHex = h => /^#[0-9A-F]{6}$/i.test(h);

  const [hexCode, setHexCode] = useState(toUpper(randomHexColor()));
  const [rgb, setRGB] = useState(hexRgb(hexCode));

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
      <div className="t-home-page">
        <div className="t-home-page__container">
          <h1 className="t-home-page__title">Welcome to Colour.it</h1>
          <p className="t-home-page__intro">We can help you find your favourite colours and make a list of them to show your friends!</p>
          <div className="t-home-page__single-colour-selector">
            <ColourBox hexCode={hexCode} />
            <Input
              id='hexcode-input'
              name='hexcode'
              type='text'
              className="t-home-page__text-input"
              placeholder={hexCode}
              onInput={e => { 
                const hex = get(e, 'target.value');

                if (isValidHex(hex)) {
                  setHexCode(hex);
                  setRGB(hexRgb(hex));
                }
              }}
            />
            <Button 
              className="t-home-page__submit"
              onClick={() => { 
                if (isValidHex(hexCode)) {
                  dispatch(saveColour({ hexCode, rgb })) ;
                  toastr.success(`${hexCode} saved!`);

                  const newHex = toUpper(randomHexColor());
                  setHexCode(newHex);
                  setRGB(hexRgb(newHex));
                }
              }}
              modifiers={['primary']}
            >
              Save this color
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;