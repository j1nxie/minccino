// necessary classes
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'back',
    description: 'plays the previous track.',

    async execute(message, client, player) {
        const queue = player.getQueue(message.guildId);

        if (!queue) {
            return await message.channel.send({
                content: ':x: | no music is playing in this server',
                ephemeral: true,
            });
        }

        if (queue) {
            queue.back();
            const currentTrack = queue.nowPlaying();

            const playEmbed = new MessageEmbed()
                .setColor(`RANDOM`)
                .setTitle(`🎶 | now playing`)
                .setDescription(`[${currentTrack.title}](${currentTrack.url})`)
                .setThumbnail(currentTrack.thumbnail);

            return await message.channel.send({ embeds: playEmbed });
        }
    }
}
