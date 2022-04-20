// necessary classes
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'displays current queue',

    async execute(message, client, player) {
        const queue = player.getQueue(message.guildId);

        if (!queue) {
            return await message.channel.send({
                content: ':x: | no music is playing in this server',
                ephemeral: true,
            });
        }

        const currentTrack = queue.current;

        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
            return `${i + 1}. **${m.title}** ([link](${m.url}))`;
        });

        const progressBar = queue.createProgressBar({ timecodes: true });

        const queueEmbed = new MessageEmbed()
            .setColor(`RANDOM`)
            .setTitle('🎶 | current queue')
            .setDescription(
                `**__now playing__ - [${currentTrack.title}](${currentTrack.url})**\n
                ${progressBar}\n
                ${tracks.join('\n')}${
                    queue.tracks.length > tracks.length
                        ? `\n...${
                            queue.tracks.length - tracks.length === 1
                                ? `{queue.tracks.length - tracks.length} more track`
                                : `{queue.tracks.length - tracks.length} more tracks`
                            }`
                        : ""
                }`
            );

        return await message.channel.send({ embeds: [queueEmbed] });
    }
}
