module.exports = {
    name: 'skip',
    description: 'skip a song.',

    async execute(message, client, player) {
        const queue = player.getQueue(message.guildId);

        if (!queue) {
            return await message.channel.send({
                content: ':x: | no music is playing in this server',
                ephemeral: true,
            });
        }

        const currentTrack = queue.nowPlaying().title;
        const success = queue.skip();
        return await message.channel.send({
            content: success
                ? `⏭ | skipped **${currentTrack}**`
                : `:x: | failed to skip track`
        });
    }
}
