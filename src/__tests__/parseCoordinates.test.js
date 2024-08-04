// src/__tests__/parseCoordinates.test.js
import { parseCoordinates } from '../index';

describe('parseCoordinates', () => {
  test('parses coordinates with space', () => {
    expect(parseCoordinates('51.50851, -0.12572')).toEqual({
      latitude: 51.50851,
      longitude: -0.12572
    });
  });

  test('parses coordinates without space', () => {
    expect(parseCoordinates('51.50851,-0.12572')).toEqual({
      latitude: 51.50851,
      longitude: -0.12572
    });
  });

  test('parses coordinates with brackets', () => {
    expect(parseCoordinates('[51.50851, -0.12572]')).toEqual({
      latitude: 51.50851,
      longitude: -0.12572
    });
  });

  test('throws error on invalid format', () => {
    expect(() => {
      parseCoordinates('invalid');
    }).toThrow('Invalid coordinate format.');

    expect(() => {
      parseCoordinates('51.50851, -0.12572, extra');
    }).toThrow('Invalid coordinate format.');

    expect(() => {
      parseCoordinates('[51.50851, -0.12572, extra]');
    }).toThrow('Invalid coordinate format.');

    expect(() => {
      parseCoordinates('[51.50851, ]');
    }).toThrow('Invalid coordinate format.');
  });
});

