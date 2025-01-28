import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AudioProvider } from '../../context/AudioContext';
import { useAudio } from '../useAudio';

function TestComponent() {
  const { playAudio, stopAudio, isPlaying, currentPlayingId } = useAudio();

  return (
    <div>
      <button
        data-testid="play-button"
        onClick={() => playAudio(123, 'http://deezer.com/preview.mp3')}
      >
        Play 123
      </button>
      <button data-testid="stop-button" onClick={stopAudio}>
        Stop
      </button>
      <div data-testid="current-id">{currentPlayingId ?? 'null'}</div>
      <div data-testid="is-123">{isPlaying(123).toString()}</div>
    </div>
  );
}

describe('useAudio hook', () => {
  it('throws an error if used outside of AudioProvider', () => {
    function TestWithoutProvider() {
      useAudio();
      return null;
    }

    expect(() => render(<TestWithoutProvider />)).toThrow(
      'useAudio must be used within an AudioProvider',
    );
  });

  it('allows playing and stopping audio', async () => {
    jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve());

    const user = userEvent.setup();
    render(
      <AudioProvider>
        <TestComponent />
      </AudioProvider>,
    );

    expect(screen.getByTestId('current-id').textContent).toBe('null');

    await user.click(screen.getByTestId('play-button'));
    expect(screen.getByTestId('current-id').textContent).toBe('123');
    expect(screen.getByTestId('is-123').textContent).toBe('true');

    await user.click(screen.getByTestId('stop-button'));
    expect(screen.getByTestId('current-id').textContent).toBe('null');
    expect(screen.getByTestId('is-123').textContent).toBe('false');
  });
});
