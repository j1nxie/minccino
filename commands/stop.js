module.exports = {
    name = 'stop',
    description = 'stop your music and destroy your queue.',

    async execute(message, client, player) {
        const queue = player.getQueue(message.guildId);
        
        if (!queue || !queue.playing) {
            return await message.channel.send({
                content: ':x: | no music is being played.',
            });
        }

        queue.destroy();
        return await message.channel.send({
            content: '🛑 | successfully stopped music.',
        });
    }
}
