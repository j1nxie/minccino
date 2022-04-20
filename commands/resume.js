module.exports = {
    name: 'resume',
    description: 'resumes the currently paused song.',

    async execute(message, client, player) {
        if (author.voice.channelId == null) {
            message.channel.send('you are not in a voice channel.');
            return;
        }

        const queue = player.getQueue(message.guildId);

        if (!queue || !queue.playing) {
            return await message.channel.send({
                content: ':x: | there is no music playing in this server.',
                ephemeral: true
            });
        }

        if (queue) {
            let y = queue.setPaused({ paused: false });
            return await message.channel.send({
                y ? `⏸ | resumed.` : `:x: | failed to resume.`
            });
        }
    }
}
