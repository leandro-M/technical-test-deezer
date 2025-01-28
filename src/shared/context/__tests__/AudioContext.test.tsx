import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AudioContext, AudioProvider } from '../AudioContext';

describe('AudioProvider', () => {
  function TestComponent() {
    const { currentPlayingId, playAudio, stopAudio, isPlaying } =
      useContext(AudioContext);

    return (
      <div>
        <p data-testid="current-id">{currentPlayingId ?? 'null'}</p>
        <button
          data-testid="play-button"
          onClick={() => playAudio(123, 'http://deezer.com/preview.mp3')}
        >
          Play Song 123
        </button>
        <button data-testid="stop-button" onClick={stopAudio}>
          Stop
        </button>
        <button
          data-testid="check-playing"
          onClick={() => alert(isPlaying(123))}
        >
          Check if 123 is playing
        </button>
      </div>
    );
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initially has no song playing', () => {
    render(
      <AudioProvider>
        <TestComponent />
      </AudioProvider>,
    );

    expect(screen.getByTestId('current-id')).toHaveTextContent('null');
  });

  it('playAudio sets the currentPlayingId', async () => {
    const user = userEvent.setup();
    render(
      <AudioProvider>
        <TestComponent />
      </AudioProvider>,
    );

    const playButton = screen.getByTestId('play-button');
    await user.click(playButton);

    expect(screen.getByTestId('current-id')).toHaveTextContent('123');
  });

  it('stopAudio stops playing and resets currentPlayingId', async () => {
    const user = userEvent.setup();
    render(
      <AudioProvider>
        <TestComponent />
      </AudioProvider>,
    );

    await user.click(screen.getByTestId('play-button'));
    expect(screen.getByTestId('current-id')).toHaveTextContent('123');

    await user.click(screen.getByTestId('stop-button'));
    expect(screen.getByTestId('current-id')).toHaveTextContent('null');
  });

  it('isPlaying returns correct boolean', async () => {
    jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve());

    const user = userEvent.setup();
    render(
      <AudioProvider>
        <TestComponent />
      </AudioProvider>,
    );

    await user.click(screen.getByTestId('play-button'));

    expect(screen.getByTestId('current-id')).toHaveTextContent('123');
  });

  it('pauses the current audio before playing a new one', async () => {
    const user = userEvent.setup();

    const playMock = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve());
    const pauseMock = jest
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {});

    render(
      <AudioProvider>
        <TestComponent />
      </AudioProvider>,
    );

    const playButton = screen.getByTestId('play-button');
    await user.click(playButton);

    expect(screen.getByTestId('current-id')).toHaveTextContent('123');
    expect(playMock).toHaveBeenCalledTimes(1);
    expect(pauseMock).not.toHaveBeenCalled();

    await user.click(playButton);
    expect(pauseMock).toHaveBeenCalledTimes(1);
    expect(playMock).toHaveBeenCalledTimes(2);

    playMock.mockRestore();
    pauseMock.mockRestore();
  });
});
