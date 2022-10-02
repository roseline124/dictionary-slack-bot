# dictionary-slack-bot

you can make dictionary for your workspace. (clone or fork and customize this app)

the default name is dict-bot.

## how to use this bot

- `/create-dict <word>`: create word and description
- `/update-dict <word>`: update word description
- `@<slack bot name> <word>`: mention bot name with the word you want to know (before mentioned, the app must be added to the channel)
  - ex. `@dictionary-bot asap`

## development

### slack socket mode

- socket mode: https://slack.dev/node-slack-sdk/socket-mode
- type of events: https://api.slack.com/events
- block kit builder: https://app.slack.com/block-kit-builder
