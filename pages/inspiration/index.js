import React, { useEffect, useState } from 'react';

import { filter, get, map, random, toUpper } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { NextSeo } from 'next-seo';
import { toastr } from 'react-redux-toastr';
import hexRgb from 'hex-rgb';
import rgbHex from 'rgb-hex';

import Button from '../../components/Objects/Button';
import ColourBox from '../../components/Objects/ColourBox';

import { saveColour } from '../../redux/actions/colourActions';

import './inspiration.scss';

const InpirationPage = props => {
  const { currentUrl } = props;
  const dispatch = useDispatch();

  const [initial, setInitial] = useState(true);
  const [colours, setColours] = useState([]);

  const isValidHex = h => /^#[0-9A-F]{6}$/i.test(h);

  const generateNewColour = () => {
    const r = random(0, 255);
    const g = random(0, 255);
    const b = random(0, 255);

    return {
      hexCode: `#${toUpper(rgbHex(r, g, b))}`,
      rgb: {
        red: r,
        green: g,
        blue: b,
        alpha: 1
      }
    };
  }

  useEffect(() => {
    if (initial) {
      setInitial(false);
      const cols = colours;

      for (let i = cols.length; i < 20; i += 1) {
        cols.push(generateNewColour());
      } 

      setColours(cols);
    }

    return () => {};
  }, []);

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
      <div className="t-inspiration-page">
        <div className="t-inspiration-page__container">
      <h1 className="t-inspiration-page__title">Can{"'"}t decide?</h1>
          <p className="t-inspiration-page__intro">Here are some colours for inspiration!</p>
          <div className="t-inspiration-page__colours">
            {map(colours, colour => (
              <div key={`colour-${get(colour, 'hexCode')}`} className="t-inspiration-page__colour">
                <ColourBox hexCode={get(colour, 'hexCode')} />
                <span className="t-inspiration-page__colour__text">{get(colour, 'hexCode')}</span>

                <Button 
                  className="t-home-page__submit"
                  onClick={() => { 
                    dispatch(saveColour(colour));

                    const newColours =
                      filter(colours, col => get(colour, 'hexCode') !== get(col, 'hexCode'));

                    newColours.push(generateNewColour());

                    setColours(newColours);
                    toastr.success(`${get(colour, 'hexCode')} saved!`);
                  }}
                  modifiers={['primary']}
                >
                  Save this color
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );


};

export default InpirationPage;
