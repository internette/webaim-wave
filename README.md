# CLI for WebAIM Wave Accessibility Audit tool

## Setup

To use the CLI, you must sign up for a [WebAim WAVE CLI API key](http://wave.webaim.org/api/)

1. Create an `.env` file
1. Add the key `API_KEY={api key value}`
   - Ex: API_KEY=thisisyourkey
1. Pass the `.env` file path with the `--envPath` flag

## Flags

All flags are prepended with `--`

- `--envPath`: Used to designate where the `.env` file lives. The default is the current working directory.
- `--url`: URL to run the Wave accessibility tools against. **Required**
- `--output`: location where to put the exported JSON file. The default location is the current working directory.

## Example commands

`webaim-wave --url=https://google.com --envPath=config/.env`

`webaim-wave --url=https://amazon.com --output=wave/output`
