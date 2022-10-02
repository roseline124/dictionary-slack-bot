# dictionary-slack-bot

you can make dictionary for your workspace. (clone or fork and customize this app)

the default name is dict-bot.

## how to use this bot

### commands

- `/create-dict <word>`: create word and description
- `/update-dict <word>`: update word description
- `@<slack bot name> <word>`: mention bot name with the word you want to know (before mentioned, the app must be added to the channel)
  - ex. `@dictionary-bot asap`
  
### usage 

- <img width="649" alt="스크린샷 2022-10-02 오후 9 36 44" src="https://user-images.githubusercontent.com/41788121/193454493-54c4a8d9-4717-46f1-8400-a0baf590d5fe.png">
- <img width="490" alt="스크린샷 2022-10-02 오후 9 37 17" src="https://user-images.githubusercontent.com/41788121/193454498-ea8be92e-d964-4bcf-8f44-c166b8e757c6.png">


## development

### slack socket mode

- socket mode: https://slack.dev/node-slack-sdk/socket-mode
- type of events: https://api.slack.com/events
- block kit builder: https://app.slack.com/block-kit-builder
