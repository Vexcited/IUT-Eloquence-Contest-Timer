# IUT de Limoges : Eloquence Contest Timer

> An implementation of the timer used in the Eloquence Contest at the IUT of Limoges.

## Modes

There's two modes, the `semi-finals` mode and the `finals` mode.

You can toggle it by clicking on the "demi-finales" or "finales" text in the footer.

### `semi-finals` mode

In this mode, there's two timers, one for the speaker that is **supporting** and one for the speaker that is **opposing**.

They both have 3 minutes to speak and the timer decreases from 3 minutes to 0 as they speak.

Contestants can go over the time limit but it'll be shown and the jury can decide to penalize them later.

- <kbd>r</kbd> to reset both timers to 3 minutes ;
- <kbd>left arrow</kbd> to play/pause the timer of the speaker that is supporting (the one on the left) ;
- <kbd>right arrow</kbd> to play/pause the timer of the speaker that is opposing (the one on the right) ;
- <kbd>space</kbd> to switch between the two timers : if the timer of the speaker that is supporting is running, it'll pause it and start the timer of the speaker that is opposing and vice-versa.

### `finals` mode

In this mode, there's only one timer that decreases from 4 minutes to 0.

The contestant has 4 minutes to speak and can go over the time limit but it'll be shown and the jury can decide to penalize them later.

- <kbd>r</kbd> to reset the timer to 4 minutes ;
- <kbd>space</kbd> to play/pause the timer.

## Development

```bash
# Clone the project from GitHub.
git clone https://github.com/Vexcited/IUT-Eloquence-Contest-Timer
cd IUT-Eloquence-Contest-Timer

# Install dependencies using pnpm.
pnpm install

# Start the development server.
pnpm dev
# Navigate to http://localhost:3000
```

## Production

```bash
# Build the project.
pnpm build
# You'll find the built files in the `dist` directory.
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
